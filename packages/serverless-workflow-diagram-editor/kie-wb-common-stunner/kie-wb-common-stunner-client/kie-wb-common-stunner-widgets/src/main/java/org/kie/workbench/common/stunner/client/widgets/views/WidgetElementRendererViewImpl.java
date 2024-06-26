/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


package org.kie.workbench.common.stunner.client.widgets.views;

import elemental2.dom.HTMLDivElement;
import elemental2.dom.HTMLElement;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import org.kie.j2cl.tools.di.core.IsElement;
import org.kie.j2cl.tools.di.ui.templates.client.annotation.DataField;
import org.kie.j2cl.tools.di.ui.templates.client.annotation.Templated;
import org.kie.workbench.common.stunner.core.client.components.views.WidgetElementRendererView;

@Templated
@Dependent
public class WidgetElementRendererViewImpl implements WidgetElementRendererView,
                                                    IsElement {

    @Inject
    @DataField
    private HTMLDivElement content;

    @Override
    public WidgetElementRendererView setWidget(final HTMLElement widget) {
        content.appendChild(widget);
        return this;
    }
}
